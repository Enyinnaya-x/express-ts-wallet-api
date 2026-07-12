export async function generateAccountNumber(phone: string): Promise<string> {
    // Generate a unique account number based on the user's phone number
    const digitsOnly = phone.replace(/\D/g, ''); // strip anything that's not a digit
    const withoutLeadingZero = digitsOnly.startsWith('0') ? digitsOnly.slice(1) : digitsOnly;
    return withoutLeadingZero.slice(0, 10);
}