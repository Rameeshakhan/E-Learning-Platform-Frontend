import styles from "../../../assets/css/dashboard.module.css"
const CreateRequest = () => {
  return (
    <div>
      <div>
        <form className={styles.requestForm}>
          <div className="mb-3">
            <label className="form-label">
              Enter Subject
            </label>
            <input
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              rows={3}
              defaultValue={""}
            />
          </div>
          <button className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateRequest
