import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  SearchSvg,
  SearchbarStyled,
  SearchForm,
  SearchFormInput,
  SearchFormButtonLabel,
  SearchFormButton,
} from './Searchbar.styled';

const schema = yup.object().shape({
  searchQuery: yup.string(),
});

export const Searchbar = ({ onSubmit }) => (
  <div>
    <Formik
      initialValues={{
        searchQuery: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        if (values.searchQuery.trim() === '') {
          toast.error('Sorry, please provide a search word');
          return;
        }

        onSubmit(values.searchQuery);
        resetForm();
      }}
    >
      <SearchbarStyled>
        <SearchForm>
          <SearchFormInput
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="searchQuery" />
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            <SearchSvg />
          </SearchFormButton>
        </SearchForm>
      </SearchbarStyled>
    </Formik>
    <ToastContainer autoClose={5000} />
  </div>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
