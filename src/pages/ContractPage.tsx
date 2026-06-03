import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContractPageUI from './ContractPageUI';

export default function ContractPage() {
  const [searchParams] = useSearchParams();

  const contactId = searchParams.get('contactId') ?? '';
  const contactName = searchParams.get('name') ?? '';
  const contactEmail = searchParams.get('email') ?? '';
  const businessName = searchParams.get('business') ?? '';
  const packageName = searchParams.get('package') ?? '';
  const projectPrice = searchParams.get('price') ?? '';
  const contactState = searchParams.get('state') ?? 'Arizona';
  const contactCounty = searchParams.get('county') ?? '';

  const [signedName, setSignedName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initials, setInitials] = useState<Record<string, string>>({});

  function handleInitialChange(section: string, value: string) {
    setInitials(prev => ({ ...prev, [section]: value }));
  }

  async function handleSign() {
    if (!signedName.trim() || !isChecked || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/sign-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId,
          contactName,
          contactEmail,
          businessName,
          signedName: signedName.trim(),
          signedAt: new Date().toISOString(),
          packageName,
          projectPrice,
          initials,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Sign contract error:', err);
      setError('Something went wrong. Please try again or contact theiconikstudios@gmail.com.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ContractPageUI
      contactName={contactName}
      contactEmail={contactEmail}
      businessName={businessName}
      packageName={packageName}
      projectPrice={projectPrice}
      contactState={contactState}
      contactCounty={contactCounty}
      signedName={signedName}
      isChecked={isChecked}
      isLoading={isLoading}
      isSuccess={isSuccess}
      error={error}
      initials={initials}
      onSignedNameChange={setSignedName}
      onCheckedChange={setIsChecked}
      onInitialChange={handleInitialChange}
      onSign={handleSign}
    />
  );
}
