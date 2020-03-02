import { mount } from '@vue/test-utils'
import FormLogin from '../../src/components/FormLogin.vue';

let validEmail,
  validPassword;

describe('Shopping List', () => {

  beforeEach(() => {
    validEmail = 'foobar@example.com';
    validPassword = 'password';
  })
  it('sets email from prop', () => {
    const wrapper = mount(FormLogin, {
      propsData: {
        email: validEmail,
      },
    });

    expect(wrapper.find('input[type=email]').element.value).toBe(validEmail);
  });

  it('is not valid with empty email and password', () => {
    const wrapper = mount(FormLogin);
    expect(wrapper.vm.isValid).toBeFalsy();
  })

  it('is not valid with empty password', () => {
    const wrapper = mount(FormLogin);

    wrapper.setData({ form: {
      email: validEmail,
    }});

    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it('is valid with email and password', () => {
    const wrapper = mount(FormLogin);

    wrapper.setData({ form: {
      email: validEmail,
      password: validPassword,
    }});

    expect(wrapper.vm.isValid).toBeTruthy();
  })

  it('input fields are bound to form data', () => {
    const wrapper = mount(FormLogin);

    const emailInput = wrapper.find('input[type=email]');
    emailInput.element.value = validEmail;
    emailInput.trigger('input');

    const passwordInput = wrapper.find('input[type=password]')
    passwordInput.element.value = validPassword;
    passwordInput.trigger('input');

    expect(wrapper.vm.form).toStrictEqual({
      email: validEmail,
      password: validPassword,
    });
  });

  it('should render validation when dirty and invalid', async () => {
    const wrapper = mount(FormLogin);
    wrapper.vm.isDirty = true;

    expect(wrapper.vm.isValid).toBeFalsy();
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('Please fill in both fields.');
  });

  it('has a submit button', () => {
    const wrapper = mount(FormLogin);
    expect(wrapper.find('button[type=submit').exists()).toBeTruthy();
  });
});
