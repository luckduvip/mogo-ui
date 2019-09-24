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
Validates.set('email',{ label: '邮箱', reg: /^[a-zA-Z0-9_-]+@\S+\.\S+$/, regErrorTips: '邮箱规则不正确' });
Validates.set('mobile',{ label: '手机号码', reg: /^1[3456789]\d{9}$/ });
Validates.set('nickname',{ label: '用户名', isRequire: true, reg: /^.{3,20}$/, regErrorTips: '昵称必须为3-20位' });
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
export const ValidateForm = function(formValues:any,formRulers:any, validateAll: string = 'all') : Promise<Array<any>>{
    return new Promise((resolve,reject)=>{
        let promiseArray = [];
        if(validateAll === 'all'){
            Object.keys(formValues).forEach((key)=>{
                if(formRulers.has(key)){
                    promiseArray.push(ValidateItem(key,formValues[key],formRulers.get(key)));
                }
            })
        }else{
            if(formValues.hasOwnProperty(validateAll) && formRulers.has(validateAll)){
                promiseArray.push(ValidateItem(validateAll,formValues[validateAll],formRulers.get(validateAll)));
            }
        }
        Promise.all(promiseArray)
            .then((result)=>{
                resolve(result.filter((item)=>{ return item[1] !== true}));
            })
    })
}