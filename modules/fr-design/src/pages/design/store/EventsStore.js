/**
 * 事件
 * @author tangzehua
 * @sine 2019-11-28 15:00
 */
import React from 'react';
import {BaseStore} from "./BaseStore";
import {Form} from "fr-ui";
import {observable} from "mobx";

export class EventsStore extends BaseStore {

    // form
    formRef = React.createRef();

    get form() {
        return this.formRef.current;
    }

    // 表单数据
    @observable.ref formConfig = [];
    formData = {};

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init(config, options = {}) {
        let that = this;

        that.formConfig = that.createFieldConfig();
    }

    createFieldConfig() {
        const fields = [];
        Array(5).fill(1).forEach((da, index) => {

            fields.push({
                className: "event-item",
                config: [
                    {
                        title: "事件",
                        form: `a.${index}`,
                        type: Form.Const.Type.Text
                    },
                    {
                        title: "吃饭",
                        form: `b.${index}`,
                        type: Form.Const.Type.Text
                    }
                ]
            })
        });
        return fields;
    }

    /**
     * 添加事件
     * @param event
     */
    handleAddEvent = (event: MouseEvent) => {
        const that = this;
        const {viewGroup} = that.main;
        const widget = viewGroup.sWidget;

        console.log(widget.getEvents())
    }
}
