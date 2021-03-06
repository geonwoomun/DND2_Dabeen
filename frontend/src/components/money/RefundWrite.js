import React, { useCallback } from 'react';
import { Button,} from "antd";
import { Select } from './Banks.style';
import { RefundModal } from './Refund.style';

const RefundWrite = ({ visible, setAccountNumber, setRefundPrice, setSelectBank, setVisible, setChecking, refundPrice, ownMilege }) => {
  const selectOnChange = useCallback(e => {
    setSelectBank(e.target.value);
  }, []);
  const accountNumberOnChange = useCallback(e => {
    setAccountNumber(e.target.value);
  }, []);
  const refundPirceOnChange = useCallback(e => {
    setRefundPrice(e.target.value);
  }, []);
  const handleOk = useCallback(e => {
    e.preventDefault();
    if(ownMilege < refundPrice) {
      alert('가진 마일리지 보다 많이 환급 받을 수는 없습니다.');
      return;
    }
    setChecking(prev => !prev);
  }, [ownMilege, refundPrice]);
  const handleCancel = useCallback(() => {
    setVisible();
  }, []);

  return (
    <RefundModal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="환급"
      footer={[<div className='btnBox'><Button className='cancelButton' onClick={handleCancel}>취소</Button><Button className='refundButton' onClick={handleOk}>환급하기</Button></div>]}
    >
      <div>
        <div className="bankSelectBoX">
          <Select
            className="bankSelect"
            placeholder="은행선택"
            onChange={selectOnChange}
          >
            {bankOptions.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <input
            type="number"
            placeholder="계좌번호"
            onChange={accountNumberOnChange}
          />
        </div>
        <div className="refundMoneyBox">
          <input
            placeholder="환급 금액"
            type="number"
            onChange={refundPirceOnChange}
          />
          <span>원</span>
        </div>
        <div className="warnText">
          <p>상기 금액에서 수수료 15%를 뺀 금액을 돌려드립니다.</p>
        </div>
      </div>
    </RefundModal>
  );
};

const bankOptions = [
  "카카오",
  "신한",
  "우리",
  "국민",
  "IBK",
  "하나",
  "제일",
  "한국씨티",
  "농협",
  "부산",
  "수협"
];

export default RefundWrite;