import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, Radio, RadioGroup, styled, TextField, Typography, useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import styles from "../../styles/UpdateModal.module.css";
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const UpdateModal = (props: any) => {
    console.log("props: ", props?.userData);

    const router = useRouter();
    const [radioValue, setRadiovalue] = useState("");
    const [checkValue, setCheckValue] = useState("");
    const [checkHobby, setCheckHobby] = useState([]);
    const [values, setValues] = useState(false);

    useEffect(() => {
        setRadiovalue(props.userData.maritalStatus);
        setCheckHobby(props.userData.hobby);
    }, []);

    function handleCheckbox(event) {
        setValues({ ...values, [event.target.name]: event.target.checked })
    }

    let Reading = false, Sport = false, IndoreGames = false;

    checkHobby.map((checkValues) => {
        if (checkValues === "Reading") {
            Reading = true;
        } else if (checkValues === "Sport") {
            Sport = true
        } else if (checkValues === "Indore Games") {
            IndoreGames = true
        }
    })

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        maritalStatus: ""
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
        maritalstatus: Yup.string().required("maritalstatus required")
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {

        console.log("data: ", data);

        await axios.patch("http://localhost:3000/api/update", data).then((response) => {
            console.log("response: ", response);
            window.location.reload()
            toast.success('updated Successfully');
        }).catch((error) => {
            toast.error('User is Already Registered');
        })
    }

    const changeSelection = (e: any) => {
        setRadiovalue(e.target.value);
    }
    const changeCheckBoxSelection = (e: any) => {
        setRadiovalue(e.target.value);
    }

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [fullWidth, setFullWidth] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [userinfo, setUserInfo] = useState({
        hobby: [],
    });

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        console.log("checked: ", checked);
        console.log("value: ", value);
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

    console.log("This is User Infio", userinfo);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Update
            </Button>
            <BootstrapDialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    margin: "100px !important"
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Update Model
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className={styles.main}>
                        <form className={styles.formmain} onSubmit={handleSubmit(onSubmit)} >
                            <Typography>Firstname :</Typography>
                            <TextField size='small' type="text" {...register('firstname')} defaultValue={props.userData.firstname} onChange={(e) => setValue("firstname", e.target.value, { shouldValidate: true })} />
                            <div className={styles.invalidFeedback}>{errors.firstname?.message}</div>

                            <Typography>Lastname :</Typography>
                            <TextField size='small' type="text" {...register('lastname')} defaultValue={props.userData.lastname} onChange={(e) => setValue("lastname", e.target.value, { shouldValidate: true })} />
                            <div className={styles.invalidFeedback}>{errors.lastname?.message}</div>

                            <Typography>Email :</Typography>
                            <TextField size='small' type="email" {...register('email')} defaultValue={props.userData.email} onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })} />
                            <div className={styles.invalidFeedback}>{errors.email?.message}</div>

                            <Typography>Password :</Typography>
                            <TextField size='small' type="password"  {...register('password')} defaultValue={props.userData.password} onChange={(e) => setValue("password", e.target.value, { shouldValidate: true })} />
                            <div className={styles.invalidFeedback}>{errors.password?.message}</div>

                            <Typography>Marital Status :</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                {...register('maritalstatus')}
                                defaultValue={formData.maritalStatus}
                                onChange={(e) => setValue("maritalstatus", e.target.value, { shouldValidate: true })}
                            >
                                <FormControlLabel {...register("maritalstatus")} value="true" control={<Radio />} onChange={changeSelection} checked={radioValue === 'true'} label="Married" />
                                <FormControlLabel {...register("maritalstatus")} value="false" control={<Radio />} onChange={changeSelection} checked={radioValue === 'false'} label="unmarried" />
                            </RadioGroup>
                            <div className={styles.invalidFeedback}>{errors.maritalstatus?.message}</div>

                            {/* <Typography>Hobby :</Typography>
                            <FormGroup>
                                <FormControlLabel name="hobby" value="Reading" control={<Checkbox />} onChange={handleChange} checked={Reading} label="Reading" />
                                <FormControlLabel name="hobby" value="Sport" control={<Checkbox />} onChange={handleChange} checked={Sport} label="Sport" />
                                <FormControlLabel name="hobby" value="Indore Games" control={<Checkbox />} onChange={handleChange} checked={IndoreGames} label="Indore Games" />
                            </FormGroup> */}

                            <br />
                            <Button variant='contained' type='submit' disabled={!formState.isValid}>{!formState.isValid && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Submit
                            </Button>
                        </form>
                    </div >
                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}