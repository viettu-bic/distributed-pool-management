export default function BicCard() {
    return (
        <div
            className="card-admin">
            <a href="#">
                <h5 className="card-title">BIC & Paymaster</h5>
            </a>
            <div className="mb-5">
                <label
                       className="form-label">Oracle</label>
                <input type="email"
                       className="form-input"/>
                <p className="form-explain">Current: 0x0000000000000000000000000000000000000000</p>
            </div>
            <button className="btn-danger">
                Change
            </button>
            <div className="mb-5">
                <label
                       className="form-label">Pause</label>
                <p className="form-explain">Current: Unpause</p>
            </div>
            <button className="btn-danger">
                Change
            </button>
        </div>
    )
}
