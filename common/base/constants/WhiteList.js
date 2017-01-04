
import { SESSION_VALUE_PAGE_BIND,SESSION_VALUE_PAGE_LOGIN
	,SESSION_VALUE_PAGE_FORGET_PASSWORD,SESSION_VALUE_PAGE_PASSWORD_SUCCESS
	,SESSION_VALUE_PAGE_SIGNUP_SUCCESS,SESSION_VALUE_PAGE_SIGNUP,SESSION_VALUE_PAGE_SECURITY_SET
} from "./Enum"

/*�ڵ�ǰҳ��������ĵ�¼ʱ ��½��Ӧ�÷���
 ����������еı��ʽƥ���URL �ڵ����¼ʱ���ǲ������returnUrl�ģ���ֹ������󷵻ص�¼
 *   ��������    ��ע��  ����  ���ҵ� ҳ��
 * */
export let toLoginWithoutReturnUrlList=[
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_FORGET_PASSWORD}$`) , //ƥ�������ܵ�3������
	new RegExp(`/account(/)?#/setpassword$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_PASSWORD_SUCCESS}$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_SIGNUP}$`) ,            //ƥ��ע����ص�����
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_SECURITY_SET}$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_SIGNUP_SUCCESS}$`) ,
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_BIND}$`) ,    //��
	new RegExp(`/account(/)?#/${SESSION_VALUE_PAGE_LOGIN}$`) ,    //��¼
]

/*������ʾ��Ҫ��¼̬������ʾ��ҳ�棬 ��Щҳ�����˳�ʱ������ת����ҳ*/
export let tokenNeededPages=[
	new RegExp(`/mall(/|/index.shtml/?|/index.html/?)?#/cart$`) ,    //���ﳵ
	new RegExp(`(/)?#/mine$`) ,    //�ҵ�
]

export const WHITELIST = [

		//yqb www
		'test5-www.stg.yqb.com',
		'test3-www.stg.yqb.com',
		'test2-www.stg.yqb.com',
		'test-www.stg.yqb.com',

		//yqb m
		'test5-m.stg.yqb.com',
		'test3-m.stg.yqb.com',
		'test2-m.stg.yqb.com',
		'test-m.stg.yqb.com',

		//1qianbao
		'test6-h5.stg.1qianbao.com',
		'test5-h5.stg.1qianbao.com',
		'test3-h5.stg.1qianbao.com',
		'test2-h5.stg.1qianbao.com',
		'test-h5.stg.1qianbao.com',
		'h5-uat.1qianbao.com',
		'h5.1qianbao.com',

	];