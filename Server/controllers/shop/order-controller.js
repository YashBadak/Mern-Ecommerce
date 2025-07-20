const paypal = require('../../helper/paypal');
const cartModel = require('../../models/cartModel');
const orderModel = require('../../models/orderModel');
const productModel = require('../../models/productModel');

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId,
        } = req.body;

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "description",
                }
            ]
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Error While Creating Paypal Payment"

                })
            } else {
                const newlyCreatedOrder = new orderModel({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                })
                await newlyCreatedOrder.save();
                const approvalURL = paymentInfo.links.find((link) => link.rel === "approval_url").href;
                res.status(200).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id,
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })

    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Cannot Be Found"
            });
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for (let item of order.cartItems) {
            let product = await productModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Not Enough Stock For This Product ${product.title}`
                });
            }
            product.totalStock -=  item.quantity;
            await product.save();

        }

        const getCartId = order.cartId;
        await cartModel.findByIdAndDelete(getCartId);
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order Confirmed",
            data: order
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Some Error Occurred"
            });
        }
    }
};


const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderModel.find({ userId });
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No Orders Found"
            })
        }

        res.status(200).json({
            success: true,
            data: orders

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })

    }
}

const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order NOt Found"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })
    }
}


module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };