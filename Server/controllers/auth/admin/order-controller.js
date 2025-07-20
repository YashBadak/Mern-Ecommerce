const orderModel = require("../../../models/orderModel");

const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        const orders = await orderModel.find({});
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

const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order NOt Found"
            });
        }

        await orderModel.findByIdAndUpdate(id,{orderStatus})

        res.status(200).json({
            success: true,
            message: "Order Status Updated SuccessFully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })
    }

}


module.exports = { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus };