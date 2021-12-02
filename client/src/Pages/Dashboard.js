import Nav from '../Components/Nav'

function Dashboard() {
  return(
    <div>

      <Nav/>
      <button className="new"><i className="fas fa-plus"></i></button>
      <div className="dashboard">
        <section className="data">
          <div className="col-1">
            <h2 className="col-head">For</h2>
            <p className="col-data">Gmail</p>
          </div>
          <div className="col-2">
            <h2 className="col-head">Username</h2>
            <p className="col-data">singhrathoremehul@gmail.com</p>
          </div>
          <div className="col-3">
            <h2 className="col-head">Password</h2>
            <p className="col-data">biteme430@</p>
          </div>
          <div className="col-4">
            <i className="fas fa-key"></i>
            <i className="fas fa-lock"></i>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
