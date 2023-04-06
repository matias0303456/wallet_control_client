import { useForm } from "react-hook-form";

export function LoginForm({ setKeyword }) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => setKeyword(data.keyword);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-25">
            <input 
            className="rounded p-1 mb-2"
            placeholder="Insert your keyword to begin..."
            {...register("keyword", { required: true })} 
             />
            {errors.keyword?.type === 'required' && <small className="mb-2">* This field is required.</small>}
            <input type="submit" className="btn btn-success w-25 mx-auto" value="Send" />
        </form>
    )
}