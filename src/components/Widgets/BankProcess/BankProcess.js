/* eslint-disable */
import { memo, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Box from '../../Common/Box';
import axios from 'axios';

const BankProcess = memo(() => {
  const [checkoutId, setCheckoutId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    createCheckout();
  }, []);

  // Function to create a checkout session
  const createCheckout = async () => {
    try {
      const response = await axios.post('https://your-btcpay-server-url/api/v1/invoices', {
        price: '10.00', // Adjust amount as needed
        currency: 'USD',
        // Additional metadata or parameters if required
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Replace 'YOUR_API_KEY' with your actual BTCPay Server API key
          'Authorization': 'Basic YOUR_API_KEY'
        }
      });

      setCheckoutId(response.data.data.id);
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  // Function to fetch payment status
  const fetchPaymentStatus = async () => {
    try {
      const response = await axios.get(`https://your-btcpay-server-url/api/v1/invoices/${checkoutId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic YOUR_API_KEY'
        }
      });

      setPaymentStatus(response.data.data.status);
    } catch (error) {
      console.error('Error fetching payment status:', error);
    }
  };

  const handlePayment = () => {
    // Redirect user to payment page
    window.location.href = `https://your-btcpay-server-url/invoices/${checkoutId}`;
    
    // Polling for payment status
    const interval = setInterval(() => {
      fetchPaymentStatus();
      // Check if payment status is 'paid' or 'completed' to stop polling
      if (paymentStatus === 'paid' || paymentStatus === 'completed') {
        clearInterval(interval);
      }
    }, 3000); // Poll every 3 seconds, adjust as needed
  };

  return (
    <Box>
      <div className='box-title box-vertical-padding box-horizontal-padding no-select'>
        <div className='flex flex-center flex-space-between'>
          <div>
            <p>Deposit Funds</p>
          </div>
        </div>
      </div>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title className="custom-card-title">Deposit with BTCPay Server</Card.Title>
                <Card.Text>
                  Click the button below to deposit funds using BTCPay Server.
                </Card.Text>
                <Button variant="primary" onClick={handlePayment} className="custom-button">
                  Deposit Now
                </Button>
                {paymentStatus && (
                  <p>Payment Status: {paymentStatus}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Box>
  );
});

export default BankProcess;
