
import {Component, ReactNode, isValidElement} from 'react';
import * as React from 'react';
import * as classNames from 'classnames';
import {IBaseComponent} from '../template/component';
import '../styles/common/reset.less';
import './index.less';

export interface IInputProps extends IBaseComponent {
  /**
   * 输入框的值
   */
  value: string;
  /**
   * 组件大小
   */
  size: 'small' | 'default' | 'large';
  /**
   * 回车回调事件
   */
  onEnter?: () => void;
  /**
   * 头部
   */
  header?: ReactNode | string;
  /**
   * 尾部
   */
  footer?: ReactNode | string;
}

export interface IInputState {
  /**
   * 值
   */
  value: string;
}

/**
 * **输入框**-用于获取用书通过键盘输入的内容
 */
export class Input extends Component<IInputProps, IInputState> {
  state = {
    value: this.props.value ? this.props.value : '',
  };

  static defaultProps = {
    size: 'default',
  };

  onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const {onEnter} = this.props;
    if (e.keyCode === 13 && onEnter) {
      onEnter();
    }
  }

  render() {
    const {className, style, size, header, footer, onEnter, ...otherProps} = this.props;
    const preCls = 'yoshino-input';
    const clsName = classNames(
      className, `${preCls}-wrapper`, `${preCls}-${size}`,
    );
    return (
      <span
        className={clsName}
        style={style}
      >
        {!!header ? (
          <span className={`${preCls}-header`} style={isValidElement(header) ? {padding: '0'} : {}}>{header}</span>
        ) : null}
        <input
          type='text'
          className={preCls}
          {...otherProps}
          onKeyDown={this.onEnter}
        />
        {!!footer ? (
          <span className={`${preCls}-footer`} style={isValidElement(footer) ? {padding: '0'} : {}}>{footer}</span>
        ) : null}
      </span>
    );
  }
}

export default Input;