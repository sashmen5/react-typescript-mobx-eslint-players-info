import * as React from 'react';
import {AddHeadToHeadForm, HeadToHeadRow} from "./forms";
import ViewStore from "../../../stores/ViewStore";
import {inject, observer} from "mobx-react";


interface ManageHeadToHeadsProps {
    viewStore?: ViewStore
}
const ManageHeadToHeads = (props: ManageHeadToHeadsProps) => {
    const {viewStore} = props;
    const {headToHeads} = viewStore;

    return (
        <div className="row">
            <h2>Manage Head To Heads</h2>
            <AddHeadToHeadForm />
            {
                headToHeads.length > 0 && <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Head To Heads</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Player A</th>
                                    <th>Player B</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    headToHeads.length > 0 ? headToHeads.map((headToHead, index) => {
                                        const {key} = headToHead;
                                        return <HeadToHeadRow key={key} headToHead={headToHead} index={index}/>
                                    }) : <tr><td colSpan={5}><p>Create your first head to head above.</p></td></tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                }
        </div>
    );
};

export default inject('viewStore')(observer(ManageHeadToHeads));