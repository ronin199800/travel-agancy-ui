import React, { Component } from "react";
import appContext from "../../../context/app";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import moment from "jalali-moment";
import axios from "axios";
import "./article.css";
import "./category.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";

class PCategory extends Component {
  static contextType = appContext;
  state = {
    categories: [],
    currentPage: 1,
    totalPages: 0,
    isLoaded: false,
    category: {
      name_fa: "",
      content_en: "",
    },
    open: true,
    showAlert: false,
    categoryToDelete: null,
    openConfirmationDialog: false,
    showDeleteAlert: false,
    validation: {
      name_fa: {
        value: "",
        isValid: false,
        touched: false,
      },
      name_en: {
        value: "",
        isValid: false,
        touched: false,
      },
    },
  };

  componentDidMount() {
    this.fetchArticleCat();
  }

  fetchArticleCat = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/article/category?page=${this.state.currentPage}`
      );
      const totalPages = response.data.totalPages || 0;
      console.log(this.response);

      setTimeout(() => {
        this.setState({
          categories: response.data.data,
          totalPages,
          isLoaded: true,
        });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  nextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState(
        { currentPage: currentPage + 1, isLoaded: false },
        this.fetchArticleCat
      );
    }
  };

  previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState(
        { currentPage: currentPage - 1, isLoaded: false },
        this.fetchArticleCat
      );
    }
  };
  handleDelete = async (category) => {
    this.setState({ categoryToDelete: category, openConfirmationDialog: true });
  };

  handleConfirmationDialogClose = async (confirmed) => {
    if (confirmed) {
      try {
        this.setState({ isLoaded: false });
        const response = await axios.delete(
          `http://localhost:5000/api/article/category/${this.state.categoryToDelete._id}`
        );
        // Remove the deleted article from the list of articles
        this.fetchArticleCat();
      } catch (error) {
        console.error(error);
      }
    }

    // Reset the state
    this.setState({ categoryToDelete: null, openConfirmationDialog: false });
  };
  showAlert = () => {
    this.setState({ showAlert: true });
  };

  hideAlert = () => {
    this.setState({ showAlert: false });
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  hideDeleteAlert = () => {
    this.setState({ showDeleteAlert: false });
  };
  handleChange = (e) => {
    const input = e.currentTarget;
    const category = { ...this.state.category };
    const validation = { ...this.state.validation };
    category[input.name] = input.value;

    // Update validation status
    validation[input.name].value = input.value;
    validation[input.name].isValid = input.value.trim() !== "";

    // Update touched status
    validation[input.name].touched = true;

    this.setState({ category, validation });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { validation } = this.state;

    // Check if all inputs are valid
    const isFormValid = Object.values(validation).every(
      (input) => input.isValid
    );

    if (isFormValid) {
      const response = await axios.post(
        "http://localhost:5000/api/article/category",
        this.state.category
      );
      this.showAlert();
      this.handleClose();
      this.fetchArticleCat();
    } else {
      // Display validation errors for invalid inputs
      const updatedValidation = { ...validation };
      Object.keys(updatedValidation).forEach((inputName) => {
        updatedValidation[inputName].touched = true;
      });
      this.setState({ validation: updatedValidation });
    }
  };
  resetInput = () => {
    this.setState({
      category: {
        name_fa: "",
        name_en: "",
      },
      validation: {
        name_fa: {
          value: "",
          isValid: false,
          touched: false,
        },
        name_en: {
          value: "",
          isValid: false,
          touched: false,
        },
      },
    });
  };

  render() {
    const {
      categories,
      currentPage,
      totalPages,
      categoryToDelete,
      openConfirmationDialog,
      validation,
    } = this.state;
    const disablePrevious = currentPage === 1;
    const disableNext = categories.length <= 12;
    const nameFaClassName = validation.name_fa.touched
      ? validation.name_fa.isValid
        ? "valid"
        : "invalid"
      : "default";
    const nameEnClassName = validation.name_en.touched
      ? validation.name_en.isValid
        ? "valid"
        : "invalid"
      : "default";
    return (
      <div className="panel-body">
        <div
          className={`panel-article-container panel-article-container-${this.context.mode}`}
        >
          <div className="add-article-button">
            <Button
              onClick={() => {
                this.resetInput();
                this.handleOpen();
              }}
              style={{
                backgroundColor:
                  this.context.mode === "dark"
                    ? "rgba(255,255,255 ,.1)"
                    : "rgba(255,255,255 ,.6)",
                color: this.context.mode === "dark" ? "#fff" : "#000",
                transition: "background-color 0.3s ease",
              }}
            >
              <span className="material-symbols-rounded">add</span>
              <span
                className="my-font"
                style={{ fontSize: ".85rem", marginBottom: "2px" }}
              >
                دسته بندی جدید
              </span>
            </Button>
          </div>

          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>
              <span className="my-font">اضافه کردن دسته بندی جدید</span>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={this.handleSubmit} className="post-form">
                <div>
                  <label htmlFor="name_fa">نام فارسی</label>
                  <input
                    onChange={this.handleChange}
                    value={this.state.category.name_fa}
                    type="text"
                    id="name_fa"
                    name="name_fa"
                    className={nameFaClassName}
                  />
                  {validation.name_fa.touched &&
                    !validation.name_fa.isValid && (
                      <div className="error-message">نام فارسی الزامی است.</div>
                    )}
                </div>
                <div>
                  <label htmlFor="name_en">نام انگلیسی</label>
                  <input
                    onChange={this.handleChange}
                    value={this.state.category.name_en}
                    type="text"
                    id="name_en"
                    name="name_en"
                    className={nameEnClassName}
                  />
                  {validation.name_en.touched &&
                    !validation.name_en.isValid && (
                      <div className="error-message">
                        نام انگلیسی الزامی است.
                      </div>
                    )}
                </div>
                {/* ... */}
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>
                <span className="my-font">بستن</span>
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                <span className="my-font">افزودن</span>
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.showAlert}
            autoHideDuration={3000}
            onClose={this.hideAlert}
          >
            <SnackbarContent
              style={{
                backgroundColor: "#10ac84",
                fontFamily: "myFont",
                boxShadow: "1px 2px 10px rgba(0,0,0,.1)",
              }}
              message="دسته بندی جدید با موفقیت ایجاد شد"
            />
          </Snackbar>
          <ul
            className={`theme-box-${this.context.mode} theme-text-${this.context.mode} panel-article-list-container`}
          >
            <div className="list-header">
              <span>نام فارسی</span>
              <span>نام انگلیسی</span>
              <span>بروزرسانی</span>
              <span>ویرایش</span>
              <span>حذف</span>
            </div>
            {this.state.isLoaded
              ? categories.map((category) => (
                  <li key={categories.id}>
                    <div className="name">
                      <span>{category.name_fa}</span>
                    </div>
                    <div className="cat name_en">
                      <span>{category.name_en}</span>
                    </div>
                    <div className={`date`}>
                      <span>
                        {digitsEnToFa(
                          moment(category.updatedAt)
                            .locale("fa")
                            .format("YYYY/MM/DD")
                        )}
                      </span>
                    </div>
                    <div className="edit">
                      <button className="edit-btn">
                        <span className={`material-symbols-rounded`}>edit</span>
                      </button>
                    </div>
                    <div className="delete">
                      <button className="delete-btn">
                        <span
                          onClick={() => {
                            this.handleDelete(category);
                          }}
                          className={`material-symbols-rounded`}
                        >
                          delete_forever
                        </span>
                      </button>
                    </div>
                    <Dialog
                      open={openConfirmationDialog}
                      onClose={() => this.handleConfirmationDialogClose(false)}
                    >
                      <DialogTitle>
                        <span className="my-font">اخطار</span>
                      </DialogTitle>
                      <DialogContent>
                        <span className="my-font">
                          آیا از پاک کردن این دسته بندی مطمئن هستید ؟
                        </span>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() =>
                            this.handleConfirmationDialogClose(false)
                          }
                          color="primary"
                        >
                          <span className="my-font">انصراف</span>
                        </Button>
                        <Button
                          onClick={() =>
                            this.handleConfirmationDialogClose(true)
                          }
                          color="secondary"
                        >
                          <span className="my-font">تایید</span>
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Snackbar
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      open={this.state.showDeleteAlert}
                      autoHideDuration={3000}
                      onClose={this.hideDeleteAlert}
                    >
                      <SnackbarContent
                        style={{
                          backgroundColor: "#10ac84",
                          fontFamily: "myFont",
                          boxShadow: "1px 2px 10px rgba(0,0,0,.04)",
                        }}
                        message="دسته بندی با موفقیت حذف شد"
                      />
                    </Snackbar>
                  </li>
                ))
              : Array(12)
                  .fill({})
                  .map(() => {
                    return (
                      <SkeletonTheme
                        baseColor={
                          this.context.mode === "dark" ? "#2f3542" : "#ced6e0"
                        }
                        highlightColor={
                          this.context.mode === "dark" ? "#57606f" : "#ffffff"
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            margin: "1rem",
                          }}
                        >
                          <Skeleton width={250} />
                          <Skeleton width={80} />
                          <Skeleton width={80} />
                          <Skeleton width={60} />
                          <Skeleton width={60} />
                        </div>
                      </SkeletonTheme>
                    );
                  })}
          </ul>
          <div className="pagination">
            <span
              style={{
                color: `var(--text-mute-${this.context.mode})`,
              }}
            >
              {`${digitsEnToFa(currentPage)} از ${digitsEnToFa(totalPages)}`}{" "}
              صفحه
            </span>

            <div className="pagination-btn">
              <button onClick={this.previousPage} disabled={disablePrevious}>
                <span className="material-symbols-rounded">navigate_next</span>
              </button>
              <button onClick={this.nextPage} disabled={disableNext}>
                <span className="material-symbols-rounded">
                  navigate_before
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PCategory;
