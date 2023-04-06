import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";

import { createMovement } from '../api/service';

export function NewMovementModal({ show, setShow, types, periodId, periods, setPeriods, keyword }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const onSubmit = async data => {
        const mov = await createMovement(keyword, { ...data, periodId })
        const prevPeriod = { ...periods.find(p => p.id === parseInt(periodId)) }
        setPeriods([
            {
                ...prevPeriod,
                movements: [mov, ...prevPeriod.movements],
                balance: mov.type.name === 'Income' ?
                    prevPeriod.balance + mov.amount :
                    prevPeriod.balance - mov.amount
            },
            ...periods.filter(p => p.id !== parseInt(periodId)),
        ])
        handleClose()
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className='bg-dark text-light'>
                <Modal.Title>New movement</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-dark text-light'>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
                    <label htmlFor="concept">Concept</label>
                    <input className='p-1 rounded' {...register("concept", { required: true, maxLength: 55 })} />
                    {errors.concept?.type === 'required' && <small>* This field is required.</small>}
                    {errors.concept?.type === 'maxLength' && <small>* This value is too long.</small>}

                    <label htmlFor="amount" className='mt-2'>Amount</label>
                    <input className='p-1 rounded w-25' {...register("amount", { required: true, max: Number.MAX_SAFE_INTEGER })} />
                    {errors.amount?.type === 'required' && <small>* This field is required.</small>}
                    {errors.amount?.type === 'max' && <small>* This value is too large.</small>}

                    <label htmlFor="typeId" className='mt-2'>Type</label>
                    <select className='p-1 w-50 rounded' {...register('typeId', { required: true })}>
                        <option value="">Select</option>
                        {types?.map(t => {
                            return <option key={t.id} value={t.id}>{t.name}</option>
                        })}
                    </select>
                    {errors.typeId?.type === 'required' && <small>* This field is required.</small>}

                    <input className='btn btn-sm btn-success mt-3 w-50 mx-auto' type="submit" value="Send" />
                </form>
            </Modal.Body>
            <Modal.Footer className='bg-dark text-light'>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}