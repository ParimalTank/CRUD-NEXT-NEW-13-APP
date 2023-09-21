"use client"
import { Button, Checkbox, FormControlLabel, FormGroup, Link, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from "../../styles/Register.module.css";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        maritalstatus: "",
    })

    // for password validation
    const lowercaseRegEx = /(?=.*[a-z])/;
    const uppercaseRegEx = /(?=.*[A-Z])/;
    const numericRegEx = /(?=.*[0-9])/;
    const lengthRegEx = /(?=.{8,})/;
    const specialRegEx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Listname is required'),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().required('Password is required')
            .matches(
                lowercaseRegEx,
                "Must contains one lowercase alphabetical character!"
            )
            .matches(
                uppercaseRegEx,
                "Must contains one uppercase alphabetical character"
            )
            .matches(numericRegEx, "Must contains one Numeric character!")
            .matches(specialRegEx, "Must contains one Special Character")
            .min(8, "Password length should be at least 8 characters")
            .max(32, "Password cannot exceed more than 32 characters"),

        maritalstatus: Yup.string().required('Marital Status is required'),
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {
        console.log("data: ", data);

        await axios.post("http://localhost:3000/api/register", { data, userinfo }).then((response) => {
            console.log("response: ", response);
            toast.success('Register Successfully');
        }).catch((error) => {
            toast.error('User is Already Registered');
        })
    }

    const [userinfo, setUserInfo] = useState({
        hobby: [],
    });

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { hobby } = userinfo;

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                hobby: [...hobby, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                hobby: hobby.filter((e) => e !== value),
            });
        }
    };

    return (
        <div className={styles.main}>
            <h1>Register</h1>
            <form className={styles.formmain} onSubmit={handleSubmit(onSubmit)} >


                <Typography>Firstname :</Typography>
                <TextField size='small' type="text" {...register('firstname')} defaultValue={formData.firstname} onChange={(e) => setValue("firstname", e.target.value, { shouldValidate: true })} />
                <div className={styles.invalidFeedback}>{errors.firstname?.message}</div>

                <Typography>Lastname :</Typography>
                <TextField size='small' type="text" {...register('lastname')} defaultValue={formData.lastname} onChange={(e) => setValue("lastname", e.target.value, { shouldValidate: true })} />
                <div className={styles.invalidFeedback}>{errors.lastname?.message}</div>

                <Typography>Email :</Typography>
                <TextField size='small' type="email" name='email' defaultValue={formData.email} onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })} />
                <div className={styles.invalidFeedback}>{errors.email?.message}</div>

                <Typography>Password :</Typography>
                <TextField size='small' type="password"  {...register('password')} defaultValue={formData.password} onChange={(e) => setValue("password", e.target.value, { shouldValidate: true })} />
                <div className={styles.invalidFeedback}>{errors.password?.message}</div>

                <Typography>Marital Status :</Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...register('maritalstatus')}
                    defaultValue={formData.maritalstatus}
                    onChange={(e) => setValue("maritalstatus", e.target.value, { shouldValidate: true })}
                >
                    <FormControlLabel {...register("maritalstatus")} value="married" control={<Radio />} label="Married" />
                    <FormControlLabel {...register("maritalstatus")} value="unmarried" control={<Radio />} label="unmarried" />
                </RadioGroup>
                <div className={styles.invalidFeedback}>{errors.maritalstatus?.message}</div>

                <Typography>Hobby :</Typography>
                <FormGroup>
                    <FormControlLabel onChange={handleChange} name="hobby" value="Reading" control={<Checkbox />} label="Reading" />
                    <FormControlLabel onChange={handleChange} name="hobby" value="Sport" control={<Checkbox />} label="Sport" />
                    <FormControlLabel onChange={handleChange} name="hobby" value="Indore Games" control={<Checkbox />} label="Indore Games" />
                </FormGroup>

                <br />
                <Button variant='contained' type='submit' disabled={!formState.isValid}>{!formState.isValid && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Submit
                </Button>
            </form>
        </div >
    )
}

export default Register