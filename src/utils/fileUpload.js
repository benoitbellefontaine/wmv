import React from 'react'
import './fileUpload.css'

export default () => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form method="post" action="#" id="#">
                        <div class="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" class="form-control" multiple="" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
