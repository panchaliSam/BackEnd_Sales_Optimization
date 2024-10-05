from flask import Flask, request, jsonify
from flask_cors import CORS 
import pandas as pd
import joblib
from prophet import Prophet

app = Flask(__name__)
CORS(app)

# Load the saved model
model_path = 'ProphetModel/prophet_model.pkl'
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict_sales():

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']

    try:
        data = pd.read_csv(file)

        data['Date'] = pd.to_datetime(data['Date'])

        data.rename(columns={'Date': 'ds', 'Sales': 'y'}, inplace=True)

   
        customer_count = int(data.shape[0])   
        sum_sales = float(data['y'].sum())  
        average_rating = data['ReviewRating'].mean()

        # Resample data to monthly sales
        monthly_data = data.resample('M', on='ds').sum().reset_index()

        model = Prophet()

        # Fit the model with the monthly sales data
        model.fit(monthly_data)

        # Create a dataframe to hold future dates (12 months ahead)
        future_dates = model.make_future_dataframe(periods=12, freq='M')


        forecast = model.predict(future_dates)

        forecasted_sales = forecast[['ds', 'yhat']].tail(12)
        forecasted_sales['Month'] = forecasted_sales['ds'].dt.strftime('%B %Y')
        forecasted_sales['MonthSales'] = forecasted_sales['yhat'].round().astype(int)

        # Create the final result as a list of dictionaries
        result = forecasted_sales[['Month', 'MonthSales']].to_dict(orient='records')


        response = {
            'forecast': result,
            'customer_count': customer_count,
            'sum_sales': sum_sales,
            'average_rating': average_rating
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/monthly_customers', methods=['POST'])
def get_monthly_customers():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']

    try:
        # Read the CSV file
        data = pd.read_csv(file)

        # Ensure the Date column is in datetime format
        data['Date'] = pd.to_datetime(data['Date'])

        # Extract month and year from the Date column
        data['Month'] = data['Date'].dt.to_period('M')

        # Count unique customers for each month
        monthly_customers = data.groupby('Month')['Customers'].nunique().reset_index()

        # Rename columns for clarity
        monthly_customers.columns = ['Month', 'Unique_Customers']

        # Convert the Month column to month names
        monthly_customers['Month'] = monthly_customers['Month'].dt.strftime('%B %Y')  # e.g., 'January 2023'

        # Convert the result to JSON format
        result = monthly_customers.to_dict(orient='records')

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/weekly_sales', methods=['POST'])
def get_weekly_sales():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']

    try:
        # Read the CSV file
        data = pd.read_csv(file)

        # Ensure the Date column is in datetime format
        data['Date'] = pd.to_datetime(data['Date'])

        # Get the last week's date range
        end_date = data['Date'].max()  # Get the most recent date in the dataset
        start_date = end_date - pd.DateOffset(days=6)  # Last 7 days (including the end date)

        # Filter data for the last week
        last_week_data = data[(data['Date'] >= start_date) & (data['Date'] <= end_date)]

        # Group by each day and sum the sales
        weekly_sales = last_week_data.groupby(last_week_data['Date'].dt.date)['Sales'].sum().reset_index()

        # Rename columns for clarity
        weekly_sales.columns = ['Date', 'Total_Sales']

        # Ensure each day of the week is represented, even if no sales occurred
        all_dates = pd.date_range(start=start_date, end=end_date, freq='D')
        weekly_sales = weekly_sales.set_index('Date').reindex(all_dates, fill_value=0).reset_index()
        weekly_sales.columns = ['Date', 'Total_Sales']

        weekly_sales['Date'] = pd.to_datetime(weekly_sales['Date']).dt.strftime('%A')


        # Convert the result to JSON format
        result = weekly_sales.to_dict(orient='records')

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/payment_percentages', methods=['POST'])
def get_payment_percentages():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']

    try:
        # Read the CSV file
        data = pd.read_csv(file)

        # Count occurrences of each payment method
        payment_counts = data['Payment Method'].value_counts()

        # Calculate total transactions
        total_transactions = payment_counts.sum()

        # Calculate percentages for each payment method
        payment_percentages = (payment_counts / total_transactions) * 100

        # Convert the result to a DataFrame
        result_df = payment_percentages.reset_index()
        result_df.columns = ['Payment Method', 'Percentage']

        # Convert the result to JSON format
        result = result_df.to_dict(orient='records')

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
