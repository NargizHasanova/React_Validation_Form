import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const schema = yup.object().shape({
    firstName: yup.string()
        .required('First Name is required')
        .matches(/^[A-Za-z]+$/, 'first name is not valid'),
    lastName: yup.string()
        .required('Last name is required')
        .matches(/^[A-Za-z]+$/, 'first name is not valid'),
    email: yup.string()
        .email('email is not valid')
        .required('Email is required'),

    age: yup.number().min(6).max(99, 'age must be less than 99').positive('age must be greater than zero').integer().required("this is required").typeError('this is required'),
    phone: yup.string()
        .required('phone is required'),
    password: yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    acceptTerms: yup.bool()
        .oneOf([true], 'Accept Ts & Cs is required')
});

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = data => console.log(data);
    return (
        <div className="registr-form">
            <h1>EVENT REGISTRATION FORM</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="name">
                    <label htmlFor="name">Name</label>
                    <div className="firstName">
                        <input
                            type="text"
                            id="name"
                            {...register("firstName")} />
                        <span>{errors.firstName?.message}</span>
                    </div>
                    <div className="lastName">
                        <input {...register("lastName")} />
                        <span>{errors.lastName?.message}</span>
                    </div>
                </div>
                <div className="company">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age"
                        {...register("age", { required: "This is required", minLength: { value: 6, message: "last name is not valid" }, maxLength: { value: 99 } })} />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>
                <div className="company">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                        {...register('password')} />
                    <span className="emailError">{errors.password?.message}</span>
                </div>
                <div className="company">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password"
                        {...register('confirmPassword')} />
                    <span className="emailError">{errors.confirmPassword?.message}</span>
                </div>

                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email"
                        {...register('email')} />
                    <span className="emailError">{errors.email?.message}</span>
                </div>

                <div className="phone">
                    <label htmlFor="phone">Phone</label>
                    <div className="area-code">
                        <input type="text" id="phone"
                            {...register("phone")} />
                        <span>{errors.phone?.message}</span>
                    </div>
                    <div className="phone-number">
                        <input type="text" />
                    </div>
                </div>

                <div className="subject">
                    <label htmlFor="gender">Gender</label>
                    <select {...register("gender")} id="gender">
                        <option value="">Select...</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </div>

                <div className="radio">
                    <label htmlFor="accept">I accept all terms</label>
                    <div className="radio-btns">
                        <input id="accept" className="radio-btn"
                            {...register('acceptTerms')} type="checkbox" />
                        <span>Yes</span>
                    </div>
                    <p className="acceptTerms">{errors.acceptTerms?.message}</p>
                </div>
                <div className="btn">
                    <button type="submit">REGISTER</button>
                </div>
            </form>
        </div>
    )
}
