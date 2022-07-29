import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchSvg,
  ToastContainerStyled,
  // SearchbarStyled,
  // SearchForm,
  // SearchFormInput,
  // SearchFormButtonLabel,
  // SearchFormButton,
} from './Searchbar.styled';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

export const Searchbar = ({ onSubmit }) => (
  <div>
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);

        resetForm();
      }}
    >
      <Form>
        <Field
          className="input"
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <ErrorMessage name="searchQuery" />
        <button type="submit" className="button">
          <span className="button-label">Search</span>
          <SearchSvg />
        </button>
      </Form>

      {/* <ToastContainerStyled /> */}
    </Formik>
  </div>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
