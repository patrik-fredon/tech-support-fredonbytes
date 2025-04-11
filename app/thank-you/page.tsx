export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-8 text-4xl font-bold">Thank You!</h1>
        <p className="mb-8 text-xl text-gray-600">
          Your message has been sent successfully. We will get back to you as soon as possible.
        </p>
        <a
          href="/"
          className="inline-block rounded-md bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
