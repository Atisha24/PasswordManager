import './index.css'

const YourPasswords = props => {
  const {passwordItemDetails, isChecked, deletePassword} = props
  const {id, websiteInput, username, passwordInput} = passwordItemDetails
  const initial = username[0].toUpperCase()

  const passwordItem = isChecked ? (
    <p className="password">{passwordInput}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-img"
    />
  )

  const onDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="password-lists-item-container">
      <div className="list-item-container">
        <div className="initial-container">{initial}</div>
        <div className="text-container">
          <p className="website-name">{websiteInput}</p>
          <p className="username">{username}</p>
          {passwordItem}
        </div>
        <div className="button-container">
          <button
            type="button"
            className="delete-btn"
            onClick={onDelete}
            testID="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete-image"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default YourPasswords
