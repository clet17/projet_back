import Order from "../models/Order.js"

export const createOrder = async (req, res) => {
    // console.log(req.body)
    const { total_price, product_orders } = req.body
    const userId = req.user.id

    

    try {
        
        const newOrder = new Order({
        user: userId,
        total_price: parseFloat(total_price),
        product_orders: JSON.parse(product_orders)
        })

        await newOrder.save()
        return res.status(201).json({ message: 'Commande créée', newOrder })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const getUserOrders = async (req, res) => {
    const userId = req.user.id

    try {
        const orders = await Order.find({ user: userId })
        .populate('product_orders.product')
        .populate('product_orders.modifiers')

        return res.status(200).json(orders)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('user', 'first_name last_name phone')
        .populate('product_orders.product')
        .populate('product_orders.modifiers')

        return res.status(200).json(orders)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    try {
        const updated = await Order.findByIdAndUpdate(id, { status }, { new: true })

        if (!updated) {
        return res.status(404).json('Commande introuvable')
        }

        return res.status(200).json({ message: 'Statut mis à jour', updated })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}


