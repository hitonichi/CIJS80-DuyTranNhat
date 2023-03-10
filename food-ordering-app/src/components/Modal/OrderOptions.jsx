import { CartContext } from '../../CartContext'
import FoodServices from '../../services/food'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

const OrderOptions = ({
    toggleModal,
    setOrdered
}) => {
    const [isOrdering, setOrdering] = useState(false)
    
    const {cart, setCart} = useContext(CartContext)
    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const openOrder = () => {
        if (cart.length === 0) {
            alert('Cart doesn\'t have anything!')
            return
        }
        setOrdering(!isOrdering)
    }

    const onSubmit = async data => {
        const res = await FoodServices.create(data)
        console.log(res);
        setOrdered(true)
        setCart([])
    }
    
    if (isOrdering) {
        return (
            <div className='order-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='d-flex flex-column'>
                        <label className='fw-bold' htmlFor='name'>Your Name</label>
                        <input className={errors.name ? 'bg-danger' : ''} {...register("name", {required: true})}></input>
                        {errors?.name && <span>Please input a valid name!</span>}

                        <label className='fw-bold' htmlFor='street'>Street</label>
                        <input className={errors.street ? 'bg-danger' : ''} {...register("street", {required: true})}></input>
                        {errors?.street && <span>Please input a valid street!</span>}
                        
                        <label className='fw-bold' htmlFor='postal'>Postal Code</label>
                        <input className={errors.postal ? 'bg-danger' : ''} {...register("postal", {required: true, pattern: /[0-9]{5}/, max: 99999})}></input>
                        {errors?.postal && <span>Please input a valid postal code (5 digits long)!</span>}

                        <label className='fw-bold' htmlFor='city'>City</label>
                        <input className={errors.city ? 'bg-danger' : ''} {...register("city", {required: true})}></input>
                        {errors?.city && <span>Please input a valid city!</span>}

                        <div className='d-flex mt-2'>
                            <button
                                className='btn btn-primary rounded-pill fw-bold text-light'
                                onClick={() => {
                                    reset()
                                    setOrdering(!isOrdering)
                                }}
                            >
                                Cancel</button>
                            <button
                                className='btn btn-primary rounded-pill fw-bold text-light' 
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div>
            <button className="btn btn-primary rounded-pill fw-bold text-light" onClick={toggleModal}>Close</button>
            <button className='btn btn-primary rounded-pill fw-bold text-light' onClick={() => openOrder()}>Order</button>
        </div>
    )
}

export default OrderOptions