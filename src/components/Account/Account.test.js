import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Account, { SubmitButton } from './Account';

describe('[Component Account]', () => {
  it('displays "Loading ..." when it is still fetching', () => {
    const AccountComponent
      = <Account 
          updateUser={jest.fn()}
          isFetching={true}
          message=''
          error=''
          user={{}}
          updateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          validateFirstName={jest.fn()}
          validateLastName={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          email=''
          firstName=''
          lastName='' />
    let wrapper = shallow(AccountComponent);
    expect(wrapper.find('h3').text()).toEqual('Loading ...'); 
  });

  it('displays error if it has error', () => {
    const AccountComponent
      = <Account 
          updateUser={jest.fn()}
          isFetching={false}
          message=''
          error='Oh nooo'
          user={{}}
          updateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          validateFirstName={jest.fn()}
          validateLastName={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          email=''
          firstName=''
          lastName='' />
    let wrapper = shallow(AccountComponent);
    expect(wrapper.find('h3').text()).toEqual('Oh nooo'); 
  });

  it('displays user', () => {
    const user = Map({
      first_name: 'Alicia',
      last_name: 'Vikander',
      email: 'alice@cc.cc',
    });

    const AccountComponent
      = <Account 
          updateUser={jest.fn()}
          isFetching={false}
          message=''
          error=''
          user={ user }
          updateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          validateFirstName={jest.fn()}
          validateLastName={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          email=''
          firstName=''
          lastName='' />
    let wrapper = shallow(AccountComponent);
    expect(wrapper.find('#updateFirstName').prop('defaultValue')).toEqual('Alicia'); 
  });

  it('updates user first name', () => {
    const updateFirstName = jest.fn();

    const user = Map({
      first_name: 'Alicia',
      last_name: 'Vikander',
      email: 'alice@cc.cc',
    });

    const AccountComponent
      = <Account 
          updateUser={jest.fn()}
          isFetching={false}
          message=''
          error=''
          user={ user }
          updateFirstName={ updateFirstName }
          updateLastName={jest.fn()}
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          validateFirstName={jest.fn()}
          validateLastName={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          email=''
          firstName=''
          lastName='' />
    let wrapper = shallow(AccountComponent);
    wrapper.find('#updateFirstName').simulate('change', {target: {value: 'Bobby'}});
    expect(updateFirstName).toHaveBeenCalledWith('Bobby');
  });

  it('display "Not ready" if form has errors', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          firstNameError='some error'
          lastNameError=''
          emailError='' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Not ready');
  });

  it('should be able to submit the form', () => {
    const updateUserFn = jest.fn();

    const user = Map({
      first_name: 'Alicia',
      last_name: 'Vikander',
      email: 'alice@cc.cc',
    });

    const AccountComponent
      = <Account 
          updateUser={ updateUserFn }
          isFetching={false}
          message=''
          error=''
          user={ user }
          updateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          validateFirstName={jest.fn()}
          validateLastName={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          email='bob@cc.cc'
          firstName='Bob'
          lastName='Smith' />
    let wrapper = shallow(AccountComponent);
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(updateUserFn).toHaveBeenCalledWith({ first_name: 'Bob', last_name: 'Smith', email: 'bob@cc.cc' });
  });
});
