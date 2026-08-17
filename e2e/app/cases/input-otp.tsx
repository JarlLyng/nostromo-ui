import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
} from "@jarllyng/nostromo";

export function InputOtpCase() {
  return (
    <div style={{ padding: 24 }} className="space-y-2">
      <Label htmlFor="otp">Verification code</Label>
      <InputOTP id="otp" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} data-testid="slot-0" />
          <InputOTPSlot index={1} data-testid="slot-1" />
          <InputOTPSlot index={2} data-testid="slot-2" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} data-testid="slot-3" />
          <InputOTPSlot index={4} data-testid="slot-4" />
          <InputOTPSlot index={5} data-testid="slot-5" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
