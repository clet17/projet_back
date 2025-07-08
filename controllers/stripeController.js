import StripePkg from 'stripe'
const Stripe = StripePkg.default || StripePkg

// Vérification de la présence de la clé secrète Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.log('⚠️ STRIPE_SECRET_KEY manquante dans process.env')
  throw new Error('Clé Stripe non définie dans les variables d’environnement')
} else {
  console.log('✅ Clé Stripe chargée avec succès')
}

// Initialisation de Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Création d’un paiement (utilisé côté client pour obtenir un clientSecret)
export const createPaymentIntent = async (req, res) => {
  // Récupération du montant dans le body
  const { amount } = req.body

  // Vérification que le montant est valide (min. 0.50 €)
  if (!amount || amount < 0.5) {
    return res.status(400).json('Montant invalide pour le paiement')
  }

  try {
    // Création du PaymentIntent via l’API Stripe (en centimes)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur'
    })

    // On renvoie le clientSecret pour que le front puisse déclencher le paiement
    return res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.log(err)
    return res.status(500).json('Erreur lors de la création du paiement')
  }
}
