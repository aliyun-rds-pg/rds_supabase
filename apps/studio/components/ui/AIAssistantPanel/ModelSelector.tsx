import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { useIsFeatureEnabled } from 'hooks/misc/useIsFeatureEnabled'
import { useSelectedOrganizationQuery } from 'hooks/misc/useSelectedOrganization'
import { useRouter } from 'next/router'
import {
  Badge,
  Button,
  CommandGroup_Shadcn_,
  CommandItem_Shadcn_,
  CommandList_Shadcn_,
  Command_Shadcn_,
  PopoverContent_Shadcn_,
  PopoverTrigger_Shadcn_,
  Popover_Shadcn_,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from 'ui'

interface ModelSelectorProps {
  selectedModel: 'qwen-plus'
  onSelectModel: (model: 'qwen-plus') => void
}

export const ModelSelector = ({ selectedModel, onSelectModel }: ModelSelectorProps) => {
  const router = useRouter()
  const { data: organization } = useSelectedOrganizationQuery()

  const [open, setOpen] = useState(false)

  const canAccessProModels = organization?.plan?.id !== 'free'
  const slug = organization?.slug ?? '_'

  const upgradeHref = `/org/${slug ?? '_'}/billing?panel=subscriptionPlan&source=ai-assistant-model`

  const handleSelectModel = (model: 'qwen-plus') => {
    onSelectModel(model)
    setOpen(false)
  }

  return (
    <Popover_Shadcn_ open={open} onOpenChange={setOpen}>
      <PopoverTrigger_Shadcn_ asChild>
        <Button
          type="outline"
          className="text-foreground-light"
          iconRight={<ChevronsUpDown strokeWidth={1} size={12} />}
        >
          {selectedModel}
        </Button>
      </PopoverTrigger_Shadcn_>
      <PopoverContent_Shadcn_ className="p-0 w-44" align="start" side="top">
        <Command_Shadcn_>
          <CommandList_Shadcn_>
            <CommandGroup_Shadcn_>
              <CommandItem_Shadcn_
                value="qwen-plus"
                onSelect={() => handleSelectModel('qwen-plus')}
                className="flex justify-between"
              >
                <span>qwen-plus</span>
                {selectedModel === 'qwen-plus' && <Check className="h-3.5 w-3.5" />}
              </CommandItem_Shadcn_>
            </CommandGroup_Shadcn_>
          </CommandList_Shadcn_>
        </Command_Shadcn_>
      </PopoverContent_Shadcn_>
    </Popover_Shadcn_>
  )
}
