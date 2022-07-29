import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchSvg,
  // ToastContainerStyled,
  SearchbarStyled,
  SearchForm,
  SearchFormInput,
  SearchFormButtonLabel,
  SearchFormButton,
} from './Searchbar.styled';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

export const Searchbar = ({ onSubmit }) => (
  <div>
    <Formik
      initialValues={{
        searchQuery: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
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
            // value={searchQuery}
          />
          <ErrorMessage name="searchQuery" />
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            <SearchSvg />
          </SearchFormButton>
        </SearchForm>
      </SearchbarStyled>

      {/* <ToastContainerStyled /> */}
    </Formik>
  </div>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
