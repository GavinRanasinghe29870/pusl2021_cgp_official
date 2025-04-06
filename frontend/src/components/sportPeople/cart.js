import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch cart items from backend
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to view your cart');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setCartItems(response.data);
            calculateTotal(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Failed to load cart items');
            setLoading(false);
        }
    };

    // Calculate total price
    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    };

    // Update quantity of an item
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/cart/${itemId}`, 
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` }}
            );

            const updatedItems = cartItems.map(item => 
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            );
            
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
            toast.success('Cart updated successfully');
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

    // Remove item from cart
    const removeItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedItems = cartItems.filter(item => item._id !== itemId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Failed to remove item');
        }
    };

    // Proceed to checkout
    const proceedToCheckout = () => {
        // Redirect to checkout page or handle checkout logic
        // This is a placeholder - implement actual checkout logic
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        toast.info('Proceeding to checkout...');
        // Redirect logic here
    };

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <h2>Loading cart...</h2>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <Card className="text-center p-5">
                    <Card.Body>
                        <Card.Title>Your cart is empty</Card.Title>
                        <Card.Text>
                            Looks like you haven't added any items to your cart yet.
                        </Card.Text>
                        <Link to="/products">
                            <Button variant="primary">Continue Shopping</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id} className="py-3">
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <img 
                                                src={item.image || 'https://via.placeholder.com/100'} 
                                                alt={item.name}
                                                className="img-fluid rounded"
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <h5>{item.name}</h5>
                                            <p className="text-muted">{item.category}</p>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price.toFixed(2)}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                                            >
                                                {[...Array(10).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2} className="text-end">
                                            <Button 
                                                variant="light" 
                                                onClick={() => removeItem(item._id)}
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-trash"></i> Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Order Summary</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Subtotal:</Col>
                                            <Col className="text-end">${total.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col className="text-end">$0.00</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>Total:</strong></Col>
                                            <Col className="text-end"><strong>${total.toFixed(2)}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button 
                                    variant="primary" 
                                    className="w-100 mt-3"
                                    onClick={proceedToCheckout}
                                    disabled={cartItems.length === 0}
                                >
                                    Proceed to Checkout
                                </Button>
                                <Link to="/products" className="btn btn-outline-secondary w-100 mt-2">
                                    Continue Shopping
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;