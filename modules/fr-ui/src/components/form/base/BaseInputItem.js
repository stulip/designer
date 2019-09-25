/**
 *
 * @author tangzehua
 * @since 2019-08-07 17:00
 */
import { BaseItem } from "./BaseItem";

class BaseInputItem extends BaseItem {

    constructor(props) {
        super(props);
        let that = this;
        // that.onEndEditing = that.onEndEditing.bind(that);
        // that.onFocus = that.onFocus.bind(that);
        // that._focusValue = null;
    }

    // onEndEditing() {
    //     let that = this;
    //     let { item } = that.props;
    //     let { value } = that.state;
    //     if (value !== that._focusValue) {
    //         item.onBlurChangeText && item.onBlurChangeText(value);
    //     }
    // }
    //
    // onFocus() {
    //     let that = this;
    //     that._focusValue = that.state.value;
    // }
}

export { BaseInputItem };
