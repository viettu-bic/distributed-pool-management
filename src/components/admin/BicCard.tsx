export default function BicCard() {
    return (
        <div
            className="card-admin">
            <a href="#">
                <h5 className="card-title">BIC Token</h5>
            </a>
            <div className="card-admin">
                <div className="mb-5">
                    <p className="form-explain">Owner: Unpause</p>
                </div>
                <button className="btn-danger">
                    Transfer Ownership
                </button>
                <button className="btn-danger">
                    Renounce Ownership
                </button>
            </div>
            <div className="card-admin">
                <div className="mb-5">
                    <p className="form-explain">Current: Unpause</p>
                </div>
                <button className="btn-danger">
                    Pause
                </button>
                <button className="btn-danger">
                    Unpause
                </button>
            </div>
            <div className="card-admin">
                <div className="mb-5">
                    <label
                        className="form-label">Block Address</label>
                    <input type="text"
                           className="form-input"/>
                    <p className="form-explain">Is Block?: false</p>
                </div>
                <button className="btn-danger">
                    Block
                </button>
                <button className="btn-danger">
                    Unblock
                </button>
            </div>
            <h5 className="card-title">Paymaster</h5>
            <div className="card-admin">
                <div className="mb-5">
                    <label
                        className="form-label">Oracle</label>
                    <input type="text"
                           className="form-input"/>
                    <p className="form-explain">Current: 0x0000000000000000000000000000000000000000</p>
                </div>
                <button className="btn-danger">
                    Change
                </button>
            </div>
            <div className="card-admin">
                <div className="mb-5">
                    <label
                        className="form-label">Add factory</label>
                    <input type="text"
                           className="form-input"/>
                    <p className="form-explain">Is Add?: false</p>

                </div>
                <button className="btn-danger">
                    Add
                </button>
            </div>
            <div className="card-admin">
                <div className="mb-5">
                    <label
                        className="form-label">Deposit</label>
                    <input type="text"
                           className="form-input"/>
                    <p className="form-explain">Current: 0</p>
                </div>
                <button className="btn-danger">
                    Deposit
                </button>
                <button className="btn-danger">
                    Withdraw
                </button>
            </div>
            <div className="card-admin">
                <div className="mb-5">
                    <label
                        className="form-label">Stake</label>
                    <input type="text"
                           className="form-input"/>
                    <p className="form-explain">Current: 0</p>
                </div>
                <button className="btn-danger">
                    Stake
                </button>
                <button className="btn-danger">
                    Unlock stake
                </button>
                <button className="btn-danger">
                    Withdraw stake
                </button>
            </div>
        </div>
    )
}
