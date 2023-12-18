import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const activeStatus = {
  initial: 'INITIAL',
  onProgress: 'PROGRESS',
  onSuccess: 'SUCCESS',
  onFaliure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    listDetails: [],
    languageFilterId: languageFiltersData[0].id,
    changeStatus: activeStatus.initial,
  }

  componentDidMount() {
    this.getRepo()
  }

  getRepo = async () => {
    const {languageFilterId} = this.state
    this.setState({changeStatus: activeStatus.onProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${languageFilterId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedDetails = data.popular_repos.map(every => ({
        id: every.id,
        avatarUrl: every.avatar_url,
        name: every.name,
        starsCount: every.stars_count,
        forksCount: every.forks_count,
        issuesCount: every.issues_count,
      }))
      this.setState({
        listDetails: updatedDetails,
        changeStatus: activeStatus.onSuccess,
      })
    }
    if (response.status === 401) {
      this.setState({changeStatus: activeStatus.onFaliure})
    }
  }

  setBtn = id => {
    this.setState({languageFilterId: id}, this.getRepo)
  }

  getOnSuccess = () => {
    const {listDetails} = this.state
    return (
      <ul className="list-bg">
        {listDetails.map(eachData => (
          <RepositoryItem key={eachData.id} itemDetails={eachData} />
        ))}
      </ul>
    )
  }

  getOnFaliure = () => (
    <div className="failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Something Went Wrong</h1>
    </div>
  )

  getOnProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderDetailsList = () => {
    const {changeStatus} = this.state
    switch (changeStatus) {
      case activeStatus.onSuccess:
        return this.getOnSuccess()

      case activeStatus.onFaliure:
        return this.getOnFaliure()

      case activeStatus.onProgress:
        return this.getOnProgress()

      default:
        return null
    }
  }

  getLanguageList = () => {
    const {languageFilterId} = this.state
    return (
      <ul className="lang-con">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            languageFiltersData={each}
            isActive={each.id === languageFilterId}
            setBtn={this.setBtn}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg">
        <div className="con">
          <h1 className="heading">Popular</h1>
          {this.getLanguageList()}
          {this.renderDetailsList()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
