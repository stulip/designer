/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, {PureComponent} from "react";

import {Resizeble} from './Resizeble'
import {Rules} from './Rules'

export class Home extends PureComponent {

    render() {
        return (
            <div>
                <span>mb</span>
                <div>
                    <Resizeble/>
                </div>
                <div>
                    <Rules/>
                </div>
            </div>
        )
    }
}
