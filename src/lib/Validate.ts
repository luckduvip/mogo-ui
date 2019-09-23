interface IValidate {
    /**出错的表单名称 */
    label:string;
    /**是否为必填 */
    isRequire?: boolean;
    /**正则表达式 */
    reg? :RegExp;
    /**正则不通过时报错 */
    regErrorTips? : string;
    /**默认类型 */
    type? : string;
    /**使用方法进行检验 */
    validateFun? : Function;
    /**验证id，用作记录已经验证过的数值， */
    symbol_id? : Symbol;
}
interface ITmp {
    id: Symbol
    val: any
}
let Validates: Map<string,IValidate> = new Map();
/**已经验证过的缓存 */
// let tmpValidateMap:Map<ITmp,boolean | string> = new Map();
let tmpValidateMap:Map<Symbol,Map<any,boolean | string>> = new Map();

Validates.set('passowrd',{ label : '密码', isRequire: true, reg: /^\S{6,18}$/, regErrorTips : '密码必须由6-18位英文/数字/符号组成' });
Validates.set('mobile',{ label: '手机号码', reg: /^1[3456789]\d{9}$/ });
Validates.set('nickname',{ label: '用户名', isRequire: true, reg: /^\S{6,20}$/, regErrorTips: '用户名必须为6-20位数字/字母/符号' });
Validates.set('code',{ label: '验证码', isRequire: true, reg: /^\d{5}$/, regErrorTips: '验证码是由5位数字组成' });

function ValidateItem(key:string,val:any,ruler:IValidate):Promise<Array<boolean | string>>{
    return new Promise((resolve,reject)=>{
        if(ruler.type && Validates.has(ruler.type)){
            ruler = {...Validates.get(ruler.type),...ruler};
        }
        if(ruler.symbol_id){
            if(tmpValidateMap.has(ruler.symbol_id)){
                if(tmpValidateMap.get(ruler.symbol_id).has(val)){
                    resolve([key,tmpValidateMap.get(ruler.symbol_id).get(val)]);
                    return;
                }
            }else{
                tmpValidateMap.set(ruler.symbol_id,new Map()); 
            }
        } 
        let _result: string | boolean = true;
        if(ruler.isRequire && val === ''){
            _result = `${ruler.label}不能为空`;
        }else if(ruler.reg && !ruler.reg.test(val)){
            if(ruler.regErrorTips){
                _result = `${ruler.label}${ruler.regErrorTips}`;
            }else{
                _result = `${ruler.label}格式不正确`;
            }
        }else if(ruler.validateFun){
            ruler.validateFun(val).then((result: any)=>{
                resolve([key,result]);
            })
            return;
        }
        if(ruler.symbol_id){
            tmpValidateMap.get(ruler.symbol_id).set(val,_result);
        }
        resolve([key,_result]);
    });
}

/**
 * 验证表单，如果通过则返回true,否则返回false
 * @param formValues any 表单的值
 * @param formRulers any 表单验证规则
 * @return boolean 验证结果
 */
export const ValidateForm = function(formValues:any,formRulers:any, validate) : Promise<Array<any>>{
    return new Promise((resolve,reject)=>{
        let promiseArray = [];
        Object.keys(formValues).forEach((key)=>{
            if(formRulers.has(key)){
                promiseArray.push(ValidateItem(key,formValues[key],formRulers.get(key)));
            }
        })
        Promise.all(promiseArray)
            .then((result)=>{
                resolve(result.filter((item)=>{ return item[1] !== true}));
            })
    })
}

// enum MYRULERS {
//     password = { label:string = '密码', isRequire: 1, reg: /^\S{6,18}$/, regError: '密码必须由6-18位英文/数字/符号组成' },
//     mobile = { label: '手机', reg: /^1[3456789]\d{9}$/ },
//     email = { label: '邮箱', reg: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/ },
//     name = { label: '用户名', isRequire: 1, reg: /^\S{6,20}$/, regError: '用户名必须为6-20位数字/字母/符号' },
//     nickname = { label: '呢称', isRequire: 1, },
//     code = { label: '验证码', isRequire: 1, reg: /^\d{5}$/, regError: '验证码是由5位数字组成' },
// }
// let ValidateItem = function(value:any,ruler:object):boolean{
// 	if(ruler.type){
// 		ruler = {...MYRULERS[ruler.type], ...ruler};
// 	}
// 	console.log(value,ruler);
// 	if(ruler.isRequire && value == ''){
// 		return `${ruler.label}不能为空`;
// 	}
// 	if(ruler.reg && !ruler.reg.test(value)){
// 		return ruler.regError || `${ruler.label}格式有误`;
// 	}
// 	if(ruler.validate){
// 		let _validateResult = ruler.validate(value);
// 		if(_validateResult != ''){
// 			return _validateResult;
// 		}
// 	}
// 	return '';
// }
// export const ValidateForm = function(formValues: object, rules: any, label:string = 'all'): string {
// 	let result = '';
// 	if(label != 'all'){
// 		return ValidateItem(formValues[label],rules.get(label));
// 	}
// 	for(let key in formValues){
// 		let item = formValues[key];
// 		if(rules.has(key)){
// 			let _result = ValidateItem(item,rules.get(key));
// 			if(_result != ''){
// 				result = _result;
// 				break;
// 			}
// 		}
// 	}
// 	return result;
// }

