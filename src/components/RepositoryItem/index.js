// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = itemDetails

  return (
    <li className="item-bg">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="item-head">{name}</h1>
      <div className="con-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="img"
        />
        <p className="item-para">{starsCount} stars</p>
      </div>
      <div className="con-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="img"
        />
        <p className="item-para">{forksCount} forks</p>
      </div>
      <div className="con-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="img"
        />
        <p className="item-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
