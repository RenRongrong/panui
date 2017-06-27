import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

/**方向 */
export enum RDirection {
    up, down, left, right
}

/**动画开关 */
export class RSwitch {
    private _status: string = 'off';
    /**开关的当前状态 */
    get status() {
        return this._status;
    }
    /**在开和关之间切换 */
    public turn() {
        if (this.status == 'off') {
            this._status = 'on';
        } else {
            this._status = 'off';
        }
    }
    /**打开 */
    public turnOn(){
        this._status = 'on';
    }
    /**关闭 */
    public turnOff(){
        this._status = 'off';
    }
}

/**弹出
 * @param triggerName - 触发器名称
 */
export function r_popUp(triggerName: string){
    return trigger(triggerName, [
        state('off', style({
            opacity: 0
        })),
        state('on', style({
            opacity: 0
        })),
        transition('off <=> on', [
            style({
                opacity: 1,
            }),
            animate('500ms ease-in', style({
                transform: 'translateY(-30px)',
                opacity: 0
            }))
        ])
    ])
}

/**移动 
 * @param triggerName -触发器名称
 * @param transform -表示变换的语句，参见css中的transform系列函数'
 * @param timing -动画时间(ms)
*/
export function r_transform(triggerName: string, transform:string, timing: number){
    return trigger(triggerName, [
        state('off', style({
            transform: 'none'
        })),
        state('on', style({
            transform: transform
        })),
        transition('off <=> on', animate(timing))
    ])
}

/**淡出 
 * @param triggerName -触发器名称
 * @param timing -动画时间(ms)
*/
export function r_fade(triggerName: string, timing: number) {
    return trigger(triggerName, [
        state('off', style({
            opacity: 1
        })),
        state('on', style({
            opacity: 0
        })),
        transition('off <=> on', animate(timing))
    ])
}

/**淡入 
 * @param triggerName -触发器名称
 * @param timing -动画时间(ms)
*/
export function r_fadeIn(triggerName: string, timing: number) {
    return trigger(triggerName, [
        state('off', style({
            opacity: 0
        })),
        state('on', style({
            opacity: 1
        })),
        transition('off <=> on', animate(timing))
    ])
}

/**调整大小
 * @param triggerName -触发器名称
 * @param width -调整后的宽度(css有效单位)
 * @param height -调整后的高度(css有效单位)
 * @param timing -动画时间(ms)
 */
export function r_resize(triggerName: string, width: string, height: string, timing: number){
    return trigger(triggerName, [
        state('off', style({
        })),
        state('on', style({
            width: width,
            height: height
        })),
        transition('off <=> on', animate(timing))
    ])
}
