import {Component} from 'react'

import {v4} from 'uuid'

import YourPasswords from '../YourPasswords'

import './index.css'

class PasswordInputs extends Component {
  state = {
    websiteInput: '',
    username: '',
    passwordInput: '',
    isChecked: false,
    searchInput: '',
    passwordItems: [],
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPasswordList = event => {
    event.preventDefault()
    const {websiteInput, username, passwordInput} = this.state

    const newPassword = {
      id: v4(),
      websiteInput,
      username,
      passwordInput,
    }

    this.setState(prevState => ({
      passwordItems: [...prevState.passwordItems, newPassword],
      websiteInput: '',
      username: '',
      passwordInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChecked = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  deletePassword = id => {
    const {passwordItems} = this.state
    const updatedPasswordItems = passwordItems.filter(each => each.id !== id)

    this.setState({
      passwordItems: updatedPasswordItems,
    })
  }

  renderShowNoPasswords = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />

      <p className="no-password">No Passwords</p>
    </div>
  )

  render() {
    const {
      searchInput,
      websiteInput,
      username,
      passwordInput,
      passwordItems,
      isChecked,
    } = this.state
    const updatedPasswordList = passwordItems.filter(eachPassword =>
      eachPassword.websiteInput
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    const count = updatedPasswordList.length

    return (
      <div>
        <div className="password-input-container">
          <div className="input-container">
            <div className="input-card">
              <form
                className="form-container"
                onSubmit={this.onAddPasswordList}
              >
                <h1 className="heading">Add New Password</h1>
                <div className="input-text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-image"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                    className="input-text"
                    value={websiteInput}
                  />
                </div>
                <div className="input-text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-image"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsername}
                    className="input-text"
                    value={username}
                  />
                </div>
                <div className="input-text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-image"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onChangePassword}
                    className="input-text"
                    value={passwordInput}
                  />
                </div>
                <div className="button-container">
                  <button type="submit" className="add-btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
        </div>
        <div className="your-passwords-container">
          <div className="your-password-top-container">
            <h1 className="show-password-heading">Your Passwords</h1>
            <p className="count">{count}</p>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={this.onChecked}
              id="showPassword"
              checked={isChecked}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>
          {count === 0 ? (
            this.renderShowNoPasswords()
          ) : (
            <ul className="ul-list">
              {updatedPasswordList.map(eachPassword => (
                <YourPasswords
                  key={eachPassword.id}
                  passwordItemDetails={eachPassword}
                  deletePassword={this.deletePassword}
                  isChecked={isChecked}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordInputs
