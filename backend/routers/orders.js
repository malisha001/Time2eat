/*const express = require('express')
const {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/orderController')


const router = express.Router()

//get all orders
router.get('/', getOrders)


//get a single order
router.get('/:id', getOrder)

//post a new order
router.post('/', createOrder )

//delete an order
router.delete('/:id', deleteOrder)


//update an order
router.patch('/:id', updateOrder)


module.exports = router */

const express = require('express')

const handler = require('express-async-handler');
const requireAuth = require ('../middleware/requireAuth.js');
const orderModel = require ('../models/orderModel.js');
const OrderStatus = require ('../src/constants/orderStatus.js');

const router = express.Router()

router.use(requireAuth);

router.post(
    '/create',
    handler(async (req,res) => {
        const order = req.body;

        if (order.items.length <= 0) res.status(400).send('Cart Is Empty!');


        await orderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW,
         });

        const newOrder = new orderModel({ ...order, user: req.user.id });
        await newOrder.save();
        res.send(newOrder);
    })
);

router.get(
    '/newOrderForCurrentUser',
    handler(async (req,res) => {
       const order = await getNewOrderForCurrentUser(req);
       if (order) res.send(order);
       else res.status(400).send();

    })
);

const getNewOrderForCurrentUser = async req =>
await orderModel.findOne ({ user: req.user.id, status: OrderStatus.NEW });

module.exports = router;