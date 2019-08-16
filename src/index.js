/*
 *export const MogoTab = require('./components/MogoTab.vue');
 *export const MogoMyItem = require('./components/MogoMyItem.vue');
 *export const MogoFooter = require('./components/MogoFooter.vue');
 */
import mogoTab from '_components/MogoTab.vue';
import mogoFooter from '_components/MogoFooter.vue';
import mogoMyItem from '_components/MogoMyItem.vue';
import mogoHeader from '_components/MogoHeader.vue';

import mogoRadioGroup from '_components/MogoRadioGroup';
import mogoCheckboxGroup from '_components/MogoCheckboxGroup';
import mogoInput from '_components/MogoInput';

import mogoBtn from '_components/MogoBtn';
import mogoSlider from '_components/MogoSlider';
import mogoProtocol from '_components/MogoProtocol';
import mogoSelect from '_components/MogoSelect';
import mogoForm from '_components/MogoForm';
import mogoSwitch from '_components/MogoSwitch';
import mogoTextarea from '_components/MogoTextarea';
import msgBtn from '_supports/MsgBtn';
/*
 *export default {
 *    MogoTab,
 *    MogoFooter,
 *    MogoMyItem,
 *}
 */
export const MogoTab = mogoTab;
export const MogoMyItem = mogoMyItem;
export const MogoFooter = mogoFooter;
export const MogoHeader = mogoHeader;

export const MogoRadioGroup = mogoRadioGroup;
export const MogoCheckboxGroup = mogoCheckboxGroup;
export const MogoInput = mogoInput;
export const MogoSwitch = mogoSwitch;
export const MogoTextarea = mogoTextarea;
export const MogoSelect = mogoSelect;
export const MogoProtocol = mogoProtocol;
export const MogoForm = mogoForm;
export const MogoSlider = mogoSlider;
export const MogoBtn = mogoBtn;
export const MsgBtn = msgBtn;
