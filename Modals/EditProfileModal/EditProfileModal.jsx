import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import css from './EditProfileModal.module.css';

import closeBtn from '/images/closeBtn.jpg';
import cameraIcon from '/icons/photo-camera.png';
import bgImg from '/images/profilebanner.jpg';
import profilePic from '/images/profilepic.jpg';

import RedBtnHov from '../../utils/Buttons/RedBtnHov/RedBtnHov';
import WhiteBtnHov from '../../utils/Buttons/WhiteBtnHov/WhiteBtnHov';
import TextUtil from '../../utils/FormUtils/TextUtil/TextUtil';
import TextUtilWithCancel from '../../utils/FormUtils/TextUtilWithCancel/TextUtilWithCancel';

const EditProfileModal = ({ setModal }) => {
    const [dropdown, setDropDown] = useState(false);
    const [initialValues] = useState({ 
        fullName: '',
        phone: '',
        email: '',
        address: '',
        description: "",
        handle: "",
        website: ""
    });

    const validationSchema = Yup.object({
        fullName: Yup.string().min(3, "Minimum 3 characters required!"),
        phone: Yup.string().min(10, "Enter a valid phone number!").max(10, "Enter a valid phone number!"),
        email: Yup.string().email("Enter a correct email address!"),
        address: Yup.string().min(5, "Minimum 5 characters required!"),
        description: Yup.string().min(5, "Minimum 5 characters required!").max(150, "Maximum 150 characters only!"),
        handle: Yup.string().min(5, "Minimum 5 characters required!"),
        website: Yup.string().url("Provide a correct URL!"),
    });

    const submitForm = (values) => {
        console.log(values, "submitted");
    };

    const updateUser = () => {
        console.log("Update User");
        setModal(false);
    };

    const domObj = (
        <div className={css.outerDiv}>
            <div className={css.innerDiv}>
                <div className={css.header}>
                    <div className={css.headerLeft}>
                        <div className={css.title}>Edit Profile</div>
                    </div>
                    <span className={css.closeBtn} onClick={() => setModal(false)}>
                        <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={css.banner}>
                    <div className={css.BGImgBox}>
                        <img src={bgImg} className={css.bgImg} alt="background" />
                    </div>
                    <div className={css.overlayImg}>
                        <div className={css.profilePicBox}>
                            <img src={profilePic} className={css.profilePic} alt="profile" />
                        </div>
                        <div className={css.cameraIconBox}>
                            <div className={css.bgCssImg} onClick={() => setDropDown(!dropdown)}>
                                <img src={cameraIcon} className={css.cameraIcon} alt="camera" />
                            </div>
                            {dropdown && (
                                <div className={css.dropdownCam}>
                                    <div className={css.opt}>Change Photo</div>
                                    <div className={css.opt}>Delete Photo</div>
                                </div>
                            )}
                        </div>
                        <div className={css.cameraIconBox2}>
                            <div className={css.bgCssImg}>
                                <img src={cameraIcon} className={css.cameraIcon} alt="camera" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.bdy}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitForm}
                        className={css.formikForm}
                    >
                        {({ values }) => (
                            <Form className={css.form}>
                                <TextUtil name="fullName" placeholder="Enter name" />
                                <TextUtil name="phone" placeholder="Enter phone number" disabled />
                                <span className={css.formTxt}>You can update your phone number using the Zomato app</span>
                                <TextUtilWithCancel txt="Change" name="email" placeholder="sample@sample.com" disabled />
                                <TextUtil name="address" placeholder="Enter address" />
                                <TextUtil name="description" placeholder="Description" />
                                <span className={css.formTxt}>Tell us something about yourself ({150 - values.description.length} characters remaining)</span>
                                <TextUtil name="handle" placeholder="Handle" />
                                <span className={css.formTxt}>You can only change your handle once</span>
                                <TextUtil name="website" placeholder="Website" />
                                <div className={css.btns}>
                                    <WhiteBtnHov txt="Cancel" onClick={() => setModal(false)} />
                                    <RedBtnHov txt="Update" onClick={updateUser} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );

    return createPortal(domObj, document.getElementById('modal'));
};

export default EditProfileModal;
