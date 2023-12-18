// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, setBtn, languageFiltersData} = props
  const {id, language} = languageFiltersData
  const changeClass = isActive ? 'btn active' : 'btn'
  const onClickBtn = () => {
    setBtn(id)
  }
  return (
    <div>
      <button className={changeClass} type="button" onClick={onClickBtn}>
        {language}
      </button>
    </div>
  )
}

export default LanguageFilterItem
