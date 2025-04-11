import SupportForm from '@/components/SupportForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold">FredonBytes Tech Support</h1>
        <p className="mb-8 text-center text-gray-600">
          Need help with one of our projects? Fill out the form below and we'll get back to you as
          soon as possible.
        </p>
        <SupportForm />
      </div>
    </div>
  );
}
