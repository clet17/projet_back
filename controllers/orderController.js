import Order from "../models/Order.js"

// Création d'une nouvelle commande
export const createOrder = async (req, res) => {
    const body = sanitizeInputs(req.body)
    // Récupération des informations dans le body
    const { total_price, product_orders } = body
    // Récupération de l'id utilisateur transmis par le middleware d'authentification
    const userId = req.user.id

    try {
        // Création de la commande avec les infos reçues
        const newOrder = new Order({
            user: userId,
            total_price: parseFloat(total_price),
            product_orders: JSON.parse(product_orders)
        })

        await newOrder.save()

        // On renvoie un message de confirmation avec la commande créée
        return res.status(201).json({ message: 'Commande créée', newOrder })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

// Récupération des commandes passées par l'utilisateur connecté
export const getUserOrders = async (req, res) => {
    const userId = req.user.id

    try {
        // On récupère les commandes associées à cet utilisateur et on affiche les détails produits et modificateurs
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

// Récupération de toutes les commandes (accès réservé à l'admin)
export const getAllOrders = async (req, res) => {
    try {
        // On récupère toutes les commandes, avec info client + détail produits et modificateurs
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

// Mise à jour du statut d’une commande (ex : En attente → Prête)
export const updateOrderStatus = async (req, res) => {
    // Récupération de l'id de la commande dans les params et du nouveau statut dans le body
    const { id } = req.params
    const { status } = req.body

    try {
        // On met à jour le statut de la commande
        const updated = await Order.findByIdAndUpdate(id, { status }, { new: true })

        if (!updated) {
            return res.status(404).json('Commande introuvable')
        }

        // On renvoie la commande mise à jour
        return res.status(200).json({ message: 'Statut mis à jour', updated })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}
