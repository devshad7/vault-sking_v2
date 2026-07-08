import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddressFormProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    zipCode: string;
    saveAddress: boolean;
  };
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  formErrors: Record<string, string>;
  handleSaveAddress: () => void;
  handleDistrictChange: (value: string | null) => void;
  handleCheckboxChange: (checked: boolean) => void;
  mockSavedAddresses: {
    id: string;
    label: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    zipCode: string;
  }[];
  setShowAddressForm: (show: boolean) => void;
}

const AddressForm = ({
  formData,
  handleInputChange,
  formErrors,
  handleSaveAddress,
  handleDistrictChange,
  handleCheckboxChange,
  mockSavedAddresses,
  setShowAddressForm,
}: AddressFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="9800000000"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address (optional)
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Address
        </label>
        <Textarea
          id="address"
          name="address"
          placeholder="House no., Street, Area"
          value={formData.address}
          onChange={handleInputChange}
          className="min-h-24"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City / Town
          </label>
          <Input
            id="city"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="district" className="text-sm font-medium">
            District
          </label>
          <Select
            value={formData.district}
            onValueChange={handleDistrictChange}
          >
            <SelectTrigger id="district">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kathmandu">Kathmandu</SelectItem>
              <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
              <SelectItem value="lalitpur">Lalitpur</SelectItem>
              <SelectItem value="pokhara">Pokhara</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="zipCode" className="text-sm font-medium">
            ZIP Code
          </label>
          <Input
            id="zipCode"
            name="zipCode"
            placeholder="Enter ZIP code"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="saveAddress"
          checked={formData.saveAddress}
          onCheckedChange={handleCheckboxChange}
        />
        <label
          htmlFor="saveAddress"
          className="text-sm font-medium cursor-pointer"
        >
          Save this address for next time
        </label>
      </div>

      {formErrors.fullName && (
        <p className="text-xs text-red-600">{formErrors.fullName}</p>
      )}
      {formErrors.phone && (
        <p className="text-xs text-red-600">{formErrors.phone}</p>
      )}
      {formErrors.address && (
        <p className="text-xs text-red-600">{formErrors.address}</p>
      )}
      {formErrors.city && (
        <p className="text-xs text-red-600">{formErrors.city}</p>
      )}
      {formErrors.district && (
        <p className="text-xs text-red-600">{formErrors.district}</p>
      )}
      {formErrors.zipCode && (
        <p className="text-xs text-red-600">{formErrors.zipCode}</p>
      )}

      <div className="flex gap-2">
        <Button type="button" onClick={handleSaveAddress} className="flex-1">
          Save Address
        </Button>
        {mockSavedAddresses.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAddressForm(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
