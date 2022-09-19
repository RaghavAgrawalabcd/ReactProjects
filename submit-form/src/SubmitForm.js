import React, { useEffect } from "react";
import { Formik, Form, useField, FieldArray } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectForm, setFormData } from "./features/form/formSlice";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { AiFillDelete } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import differenceInYears from "date-fns/differenceInYears";
import "react-datepicker/dist/react-datepicker.css";

function SubmitForm() {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const { formValue } = useSelector(selectForm);

  const dispatch = useDispatch();

  const notify = (Message) => toast(Message);

  const validationSchema = Yup.object({
    residentialStreet1: Yup.string().required("Required"),
    residentialStreet2: Yup.string().required("Required"),
    permanentStreet1: Yup.string(),
    permanentStreet2: Yup.string(),
    checkbox: Yup.boolean(),
    dob: Yup.date().test("dob", "Min. age should be 18 years", function (value) {
      return differenceInYears(new Date(), new Date(value)) >= 18;
    }),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Invalid email"),
    documents: Yup.array().of(
      Yup.object().shape({
        fileName: Yup.string().required("Required"),
        fileType: Yup.string().required("Required"),
        file: Yup.string().required("Required"),
      })
    ) .required('Required').min(2, 'Minimum two documents are required'),
  });

  const initialValues = {
    residentialStreet1: "",
    residentialStreet2: "",
    permanentStreet1: "",
    permanentStreet2: "",
    checkbox: false,
    dob: "",
    firstName: "",
    lastName: "",
    email: "",
    documents: [{ fileName: "", fileType: "Image", file: "" }],
  };

  useEffect(() => {
    console.log("formsValue", formValue);
  }, [formValue]);

  const submitForm = (data, resetForm) => {
    try {
      let newArray = [...formValue];
      const newObj = { ...data, dob: data.dob.toGMTString() };
      console.log(newArray);
      newArray.push(newObj);
      console.log(newArray);
      dispatch(setFormData(newArray));
      notify("Form submitted successfully")
      window.alert("Form submitted successfully")
      resetForm(initialValues);
    } catch (e) {
      console.log(e);
    }
  };

  const DatePickerField = ({ label, star = true, ...props }) => {
    const [field, meta, { setValue }] = useField(props);
    return (
      <div className="m-3 flex flex-col w-5/12">
        <label
          className="mb-0 w-11/12 text-base font-bold"
          htmlFor={props.id || props.name}
        >
          {label}
          {star ? <span className="text-red-900 font-bold">*</span> : ""}
        </label>
        <DatePicker
          className="pl-2 w-72 border-2 rounded border-slate-400 3xl:h-16 text-base h-8"
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setValue(val);
          }}
        />
        {meta.touched && meta.error ? (
          <div className="error font-semibold text-sm 2xl:text-2xl 2xl:mt-2 w-60 text-red-700">
            {meta.error}
          </div>
        ) : null}
      </div>
    );
  };

  const TextInput = ({ label, star = true, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);

    return (
      <div className="m-3 flex flex-col w-5/12">
        <label
          className="mb-0 w-11/12 text-base font-bold"
          htmlFor={props.id || props.name}
        >
          {label}
          {star ? <span className="text-red-900 font-bold">*</span> : ""}
        </label>
        <input
          className={`pl-2 w-12/12 border-2 rounded border-slate-400 3xl:h-16 text-base h-8  ${
            props?.type === "file" ? "-pl-20 " : ""
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error font-semibold text-sm 2xl:text-2xl 2xl:mt-2 text-red-700">
            {meta.error}
          </div>
        ) : null}
      </div>
    );
  };

  const CheckBox = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="m-3 flex items-center w-6/12">
        <input
          className="w-6 h-6 3xl:w-12 3xl:h-12 2xl:w-8 2xl:h-8 mr-4 "
          {...field}
          {...props}
        />
        <label
          className="mb-0 w-11/12 text-base font-bold"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        {meta.touched && meta.error ? (
          <div className="error font-semibold text-sm 2xl:text-2xl 2xl:mt-2 text-red-700">
            {meta.error}
          </div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label,star=true, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="m-3 flex flex-col  text-base font-bold">
        <label className="mb-0 w-40" htmlFor={props.id || props.name}>
          {label}
          {star ? <span className="text-red-900 font-bold">*</span> : ""}
        </label>
        <select
          className="w-40 border-2 h-8 bg-white rounded border-slate-400"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error font-semibold text-sm">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="w-6/12 h-full m-auto">
      <h3 className="text-2xl 4xl:text-5xl 3xl:mt-10 3xl:mb-10 2xl:text-5xl 2xl:mt-6 font-semibold font-Nixie mb-9 text-center mt-6">
        REACT JS MACHINE TEST
      </h3>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={(values, { setSubmitting }) => {
        //   submitForm(values);
        //     setSubmitting(false);
        // }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitForm(values, resetForm);
          // handleSave(params, () => {
          //   resetForm(initialValues)
          // })

          setSubmitting(false);
        }}
      >
        {({ 
           setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched}) => (
          <Form className="font-Nixie font-medium text-lg 2xl:text-3xl 3xl:text-4xl">
            <div className="flex w-full justify-between">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter your first name here.."
              />
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter your last name here.."
              />
            </div>
            <div className="flex w-full justify-between">
              <TextInput
                label="Email"
                name="email"
                type="text"
                placeholder="ex: myname@example.com"
              />
             <div>
             <DatePickerField
                label="Date of Birth"
                name="dob"
                placeholder="Date of Birth"
              />
             </div>
            </div>
            <div className="flex flex-col w-full justify-between">
              <p className="ml-3 -mb-3 mt-3 font-bold">Residential Address</p>
              <div className="flex w-full justify-between">
                <TextInput
                  label="Street 1"
                  name="residentialStreet1"
                  type="text"
                />
                <TextInput
                  label="Street 2"
                  name="residentialStreet2"
                  type="text"
                />
              </div>
            </div>

            <div className="flex w-full justify-between">
              <CheckBox
                label="Same as residential Address"
                name="checkbox"
                type="checkbox"
              />
            </div>
            <p className="ml-3 -mb-3 mt-3 font-bold">Permanent Address</p>
            {
              <div className="flex w-full justify-between">
                <TextInput
                  label="Street 1"
                  name="permanentStreet1"
                  type="text"
                  star={false}
                  disabled={values.checkbox}
                  value={
                    values.checkbox
                      ? (values.permanentStreet1 = values.residentialStreet1)
                      : values.permanentStreet1
                  }
                />
                <TextInput
                  label="Street 2"
                  name="permanentStreet2"
                  type="text"
                  star={false}
                  disabled={values.checkbox}
                  value={
                    values.checkbox
                      ? (values.permanentStreet2 = values.residentialStreet2)
                      : values.permanentStreet2
                  }
                />
              </div>
            }

            <div className="flex flex-col w-full justify-between">
              <p className="ml-3 -mb-3 mt-3 font-bold">Upload Documents</p>
            </div>
            <FieldArray
              name="documents"
              render={(arrayHelpers) => {
                const documents = values?.documents;
                return (
                  <div>
                    {documents && documents?.length > 0
                      ? documents.map((document, index) => (
                          <div key={index}>
                            <div className="flex w-full justify-between">
                              <TextInput
                                label="File Name"
                                name={`documents.${index}.fileName`}
                                type="text"
                              />

                              <div className="">
                              <MySelect
                                label="Type of File"
                                name={`documents.${index}.fileType`}
                                
                              >
                                <option value="Image">Image</option>
                                <option value="PDF">PDF</option>
                              </MySelect>
                              <p className="text-sm pl-3 -mt-3">(image,pdf)</p>
                              </div>


                              <TextInput
                                label="Upload Document"
                                name={`documents.${index}.file`}
                                type="file"
                                accept={
                                  values.documents[
                                    index
                                  ].fileType?.toLowerCase() === "image"
                                    ? `image/*`
                                    : "application/pdf"
                                }
                              />
                              {index === 0 ? (
                                <button
                                  className="mt-3"
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      fileName: "",
                                      fileType: "Image",
                                      file: "",
                                    })
                                  } // insert an empty string at a position
                                >
                                  <MdAddCircle />
                                </button>
                              ) : (
                                <button
                                  className="mt-3"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a document from the list
                                >
                                  <AiFillDelete />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      : null}
                    <br />
                    { typeof errors?.documents === 'string' ? (
                  <div className="error font-semibold text-sm 2xl:text-2xl 2xl:mt-2 ml-3 -mt-6">
                    {JSON.stringify(errors.documents) }
                  </div>
                ) : null}
                  </div>  
                );
              }
            }
            />
            <div className="w-full flex flex-col items-center">
              <button
                type="submit"
                className="2xl:w-48 2xl:h-16 2xl:text-4xl border w-32 h-9 m-auto mt-8 mb-4 rounded-lg text-xl font-Nixie bg-buttonBg border-slate-600 font-semibold"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SubmitForm;
