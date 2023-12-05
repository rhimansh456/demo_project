const LanguageSelector = (props) => {
    return (
        <select onChange={props.onChange}>
            <option>Select Language</option>
            <option value={'en'}>English</option>
            <option value={'ar'}>Arabic</option>
            <option value={'ko'}>Korean</option>
        </select>
    )
}
export default LanguageSelector;