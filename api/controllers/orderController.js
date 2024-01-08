const orderService = require('../services/orderService');


const createOrder = async (req, res) => {
    const { userId, restaurantId, items, total } = req.body;

    if (!userId || !restaurantId || !total) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    if (!items || !items.length) {
        return res.status(400).json({ message: 'Order cannot be empty!' });
    }

    try {
        const result = await orderService.createOrder(userId, restaurantId, items, total);

        if (!result.success) {
            return res.status(409).json({ message: result.message });
        }

        return res.status(201).json({ message: 'Order created successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    if (!orderId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    try {
        const result = await orderService.deleteOrder(orderId);

        if (!result.success) {
            return res.status(409).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}

const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.body.userId;
    const status = req.body.status;

    if (!orderId || !userId) {
        return res.status(400).json({ message: 'Missing required data!' });
    }

    if (!status && status.length === 0) {
        return res.status(400).json({ message: 'Missing order status or status cannot be empty!' });
    }

    try {
        const result = await orderService.updateOrderStatus(orderId, userId, status);

        if (!result.success) {
            return res.status(409).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Order status updated successfully!' });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}


module.exports = {
    createOrder,
    deleteOrder,
    updateOrderStatus
}